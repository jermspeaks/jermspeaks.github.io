<script>
  let { title, children } = $props();
</script>

<section>
  <h2>{title}</h2>
  {@render children?.()}
</section>

<style>
  section {
    background: #f3f3f3;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }

  h2 {
    margin-top: 0px;
    text-align: center;
  }
</style>
