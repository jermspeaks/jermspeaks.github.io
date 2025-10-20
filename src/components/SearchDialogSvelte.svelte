<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as Dialog from './ui/dialog/index.js';

  let { searchId = 'search' }: { searchId?: string } = $props();

  let isOpen = $state(false);
  let mutationObserver: MutationObserver | null = null;

  // Color schemes for Algolia
  const colorScheme = {
    dark: {
      mark: "#fff",
      background: "#23263b",
      selected: "#111432",
      text: "#d6d6e7",
      colorSourceIcon: "#d6d6e7",
    },
    light: {
      mark: "#f25042",
      background: "#f9f4ef",
      selected: "#e0dbd7",
      text: "#222",
      colorSourceIcon: "#444",
    },
  };

  // Initialize Algolia search
  function initializeAlgolia() {
    console.log('🔍 [SearchDialog] initializeAlgolia called');
    
    if (typeof window === 'undefined') {
      console.log('❌ [SearchDialog] Window is undefined, skipping initialization');
      return;
    }

    const isDarkMode = document.documentElement.classList.contains('dark');
    const theme = isDarkMode ? colorScheme.dark : colorScheme.light;
    
    console.log('🎨 [SearchDialog] Theme detection:', { isDarkMode, theme });

    // Clear existing content
    const container = document.getElementById(searchId);
    console.log('📦 [SearchDialog] Container found:', { searchId, container: !!container });
    
    if (container) {
      container.innerHTML = '';
      console.log('🧹 [SearchDialog] Cleared existing content');
    } else {
      console.error('❌ [SearchDialog] Container not found for searchId:', searchId);
      return;
    }

    // Check if algoliasearchNetlify is available
    const algoliaFunction = (window as any).algoliasearchNetlify;
    console.log('🔧 [SearchDialog] algoliasearchNetlify available:', !!algoliaFunction);
    
    if (algoliaFunction) {
      console.log('🚀 [SearchDialog] Initializing Algolia with config:', {
        appId: "436X6I66DK",
        siteId: "ba48845b-90cf-4096-a2a5-816539b2e5a6",
        branch: "main",
        selector: `#${searchId}`,
        theme,
        hitsPerPage: 10
      });
      
      try {
        algoliaFunction({
          appId: "436X6I66DK",
          apiKey: "b03e4f0173081b7c00e2c966802f8fa3",
          siteId: "ba48845b-90cf-4096-a2a5-816539b2e5a6",
          branch: "main",
          selector: `#${searchId}`,
          theme,
          hitsPerPage: 10,
          searchOnEnterKeyPressOnly: false,
          searchAsYouType: true,
          // Force Algolia to render within the dialog container
          container: `#${searchId}`,
          // Disable automatic positioning to keep results within dialog
          openOnFocus: false,
          // Ensure results stay within bounds
          debug: false
        });
        console.log('✅ [SearchDialog] Algolia initialized successfully');
        
        // Check if search input was created
        setTimeout(() => {
          const searchInput = document.querySelector(`#${searchId} input[type="search"]`);
          console.log('🔍 [SearchDialog] Search input created:', !!searchInput);
          if (searchInput) {
            console.log('📝 [SearchDialog] Search input element:', searchInput);
          }
          
          // Add click listener to search results to close dialog
          const searchContainer = document.getElementById(searchId);
          if (searchContainer) {
            searchContainer.addEventListener('click', (event) => {
              console.log('🖱️ [SearchDialog] Click detected on:', event.target);
              
              // Check if clicked element is a link or has a link ancestor
              const link = (event.target as HTMLElement)?.closest('a');
              if (link) {
                console.log('🔗 [SearchDialog] Link clicked:', {
                  href: link.href,
                  text: link.textContent?.trim(),
                  target: link.target
                });
                
                // Close dialog after a short delay to allow navigation
                setTimeout(() => {
                  isOpen = false;
                }, 100);
              } else {
                console.log('🖱️ [SearchDialog] Non-link clicked:', event.target);
              }
            });
            console.log('🔗 [SearchDialog] Added click listener to search results');
          }

          // Add mutation observer to catch Algolia elements created outside dialog
          mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as HTMLElement;
                  // Check if it's an Algolia panel or dropdown
                  if (element.classList.contains('aa-Panel') || 
                      element.classList.contains('aa-Dropdown') ||
                      element.querySelector('.aa-Panel') ||
                      element.querySelector('.aa-Dropdown')) {
                    console.log('🔍 [SearchDialog] Algolia element created outside dialog, moving inside:', element);
                    
                    // Move the element inside the search container
                    const searchContainer = document.getElementById(searchId);
                    if (searchContainer && element.parentNode !== searchContainer) {
                      searchContainer.appendChild(element);
                      console.log('✅ [SearchDialog] Moved Algolia element inside dialog');
                    }
                  }
                }
              });
            });
          });

          // Start observing the document body for new Algolia elements
          mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
          });

          console.log('👀 [SearchDialog] Added mutation observer for Algolia elements');
        }, 500);
        
      } catch (error) {
        console.error('❌ [SearchDialog] Error initializing Algolia:', error);
      }
    } else {
      console.error('❌ [SearchDialog] algoliasearchNetlify function not available on window object');
      console.log('🔍 [SearchDialog] Available window properties:', Object.keys(window).filter(key => key.includes('algolia')));
      
      // Retry after a delay in case the script is still loading
      console.log('⏳ [SearchDialog] Retrying Algolia initialization in 1 second...');
      setTimeout(() => {
        console.log('🔄 [SearchDialog] Retry: algoliasearchNetlify available:', !!(window as any).algoliasearchNetlify);
        if ((window as any).algoliasearchNetlify) {
          console.log('✅ [SearchDialog] Retry successful, initializing Algolia...');
          initializeAlgolia();
        } else {
          console.error('❌ [SearchDialog] Retry failed - algoliasearchNetlify still not available');
        }
      }, 1000);
    }
  }

  // Handle keyboard shortcut
  function handleKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === '/') {
      console.log('⌨️ [SearchDialog] Keyboard shortcut triggered');
      event.preventDefault();
      isOpen = !isOpen;
    }
  }

  // Focus search input when dialog opens
  function focusSearchInput() {
    console.log('🎯 [SearchDialog] focusSearchInput called');
    setTimeout(() => {
      const searchInput = document.querySelector(`#${searchId} input[type="search"]`) as HTMLInputElement;
      console.log('🔍 [SearchDialog] Search input for focus:', !!searchInput);
      if (searchInput) {
        searchInput.focus();
        console.log('✅ [SearchDialog] Search input focused');
      } else {
        console.warn('⚠️ [SearchDialog] Search input not found for focusing');
      }
    }, 100);
  }

  // Watch for dialog open state changes
  $effect(() => {
    console.log('🔄 [SearchDialog] Dialog state changed:', { isOpen, searchId });
    if (isOpen) {
      console.log('🚀 [SearchDialog] Dialog opened, initializing...');
      initializeAlgolia();
      focusSearchInput();
    } else {
      console.log('🔒 [SearchDialog] Dialog closed');
    }
  });

  onMount(() => {
    console.log('🏗️ [SearchDialog] Component mounted');
    
    // Check if algoliasearchNetlify is available on mount
    console.log('🔧 [SearchDialog] Checking algoliasearchNetlify availability on mount:', !!(window as any).algoliasearchNetlify);
    
    // Check if Algolia scripts are loaded
    const algoliaScript = document.querySelector('script[src*="algoliasearch-netlify-frontend"]');
    const algoliaCSS = document.querySelector('link[href*="algoliasearchNetlify.css"]');
    console.log('📜 [SearchDialog] Algolia scripts loaded:', { 
      script: !!algoliaScript, 
      css: !!algoliaCSS,
      scriptSrc: algoliaScript?.getAttribute('src'),
      cssHref: algoliaCSS?.getAttribute('href')
    });
    
    // If scripts aren't loaded yet, wait a bit and check again
    if (!algoliaScript || !algoliaCSS) {
      console.log('⏳ [SearchDialog] Algolia scripts not yet loaded, waiting...');
      setTimeout(() => {
        const retryScript = document.querySelector('script[src*="algoliasearch-netlify-frontend"]');
        const retryCSS = document.querySelector('link[href*="algoliasearchNetlify.css"]');
        console.log('🔄 [SearchDialog] Retry check - Algolia scripts loaded:', { 
          script: !!retryScript, 
          css: !!retryCSS 
        });
      }, 1000);
    }
    
    // Add keyboard shortcut listener
    document.addEventListener('keydown', handleKeydown);
    console.log('⌨️ [SearchDialog] Keyboard shortcut listener added');
    
    // Initialize Algolia on mount if dialog is already open
    if (isOpen) {
      console.log('🚀 [SearchDialog] Dialog already open on mount, initializing Algolia');
      initializeAlgolia();
    }

    return () => {
      console.log('🧹 [SearchDialog] Component unmounting, cleaning up');
      document.removeEventListener('keydown', handleKeydown);
      
      // Clean up mutation observer
      if (mutationObserver) {
        mutationObserver.disconnect();
        console.log('🧹 [SearchDialog] Mutation observer disconnected');
      }
    };
  });
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Trigger 
    class="search-trigger border-none bg-none cursor-pointer flex justify-center p-1 text-black hover:text-gray-600 dark:text-white transition-all duration-200 hover:scale-105"
    onclick={() => console.log('🖱️ [SearchDialog] Trigger button clicked')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="24"
      height="20"
      class="dark:fill-white"
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
    <span class="sr-only">Open search (⌘/)</span>
  </Dialog.Trigger>

  <Dialog.Content class="max-w-2xl w-[90vw] max-h-[80vh] p-0 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Dialog.Header class="px-6 pt-4">
      <Dialog.Title class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Search
      </Dialog.Title>
    </Dialog.Header>
    
    <div class="px-6 pb-4 max-h-[60vh] overflow-y-auto">
      <div id={searchId} class="search-container"></div>
    </div>
  </Dialog.Content>
</Dialog.Root>

<style>
  /* Ensure Algolia search respects dark mode */
  :global(.search-container) {
    position: relative;
  }

  :global(.dark .search-container .ais-SearchBox) {
    background: #1e293b;
  }

  :global(.dark .search-container .ais-SearchBox-input) {
    background: #374151;
    color: #f9fafb;
    border-color: #4b5563;
  }

  :global(.dark .search-container .ais-SearchBox-input::placeholder) {
    color: #9ca3af;
  }

  :global(.dark .search-container .ais-Hits) {
    background: #1e293b;
  }

  :global(.dark .search-container .ais-Hits-item) {
    background: #1e293b;
    border-color: #374151;
  }

  :global(.dark .search-container .ais-Hits-item:hover) {
    background: #374151;
  }

  /* Ensure search results are contained within the dialog */
  :global(.search-container .ais-Hits) {
    max-height: 50vh;
    overflow-y: auto;
  }

  /* Override any absolute positioning from Algolia */
  :global(.search-container .ais-Hits-list),
  :global(.search-container .ais-Hits-item),
  :global(.search-container .ais-SearchBox-form),
  :global(.search-container .ais-SearchBox-input) {
    position: relative !important;
  }

  /* Force Algolia panel to stay within dialog */
  :global(.aa-Panel) {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    width: 100% !important;
    max-width: none !important;
    transform: none !important;
    z-index: 1001 !important;
  }

  /* Ensure Algolia dropdown stays within dialog bounds */
  :global(.aa-Dropdown) {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    width: 100% !important;
    max-width: none !important;
    transform: none !important;
    z-index: 1001 !important;
  }

  /* Force all Algolia elements to be contained */
  :global(.search-container *) {
    position: relative !important;
    z-index: 1001 !important;
  }
</style>
