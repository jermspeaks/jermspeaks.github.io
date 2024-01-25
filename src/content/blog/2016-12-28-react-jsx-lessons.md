---
tags: ["blog", "post", "programming", "Javascript", "React", "JSX", "Code Style"]
title: React JSX Syntax - Code Style
date: 2016-12-28
pubDate: "2016-12-28"
description: ""
heroImage: ""

---

After a year working with JSX syntax in React, I've learned a few things reviewing my code as well as other developer's code.
I am taking the perspective of a code review in these following code samples.

This is my main takeaway:

> Code Style increases legibility

Let me elaborate.

**Proper Indentation helps code reviewers.**

Here is a code snippet with terrible indentation. 

```html
<div className='col-sm-12 col-md-12'>
<div className='product-details-top'>
  <div className='col-md-4'>
  </div>
  <div className='col-md-5' />
  <div className='col-md-3 no-pad-right form-group'>
  <div className='pull-right'>
    <button
      className='btn cancel-btn btn btn-default'
      id='inform-media-product-edit-product-cancel-button-1'
      type='button'
      onClick={this.handleBack}
    >
    CANCEL
    </button>
    <button
      className='btn btn-blue btn btn-default'
      type='submit'
      id='inform-media-product-edit-product-save-changes-button-1'
      onClick={this.updateProduct}
      disabled={this.state.productName.trim() === ''}
    >
      SAVE CHANGES
    </button>
    </div>
  </div>
</div>
</div>
{this.state.confirmModal ? (
  <ConfirmationCard page='Product' confirmAction={this.confirmAction}/>
) : null}
</div>
```

The first two lines have the same indentation, even though the second `<div>` is nested in the first one.

**Empty tags should be self-closing**

Next, there is inconsistent with tags.
On line 3, the `<div>` is empty and has a closing tag.
On line 5, the `<div>` is self closing.

Here's a snippet of a fixing the indentation and self closing tags.

```html
<div className='col-sm-12 col-md-12'>
  <div className='product-details-top'>
    <div className='col-md-4' />
    <div className='col-md-5' />
    <div className='col-md-3 no-pad-right form-group'>
      <div className='pull-right'>
        <button
          className='btn cancel-btn btn btn-default'
          id='inform-media-product-edit-product-cancel-button-1'
          type='button'
          onClick={this.handleBack}
        >
          CANCEL
        </button>
        <button
          className='btn btn-blue btn btn-default'
          type='submit'
          id='inform-media-product-edit-product-save-changes-button-1'
          onClick={this.updateProduct}
          disabled={this.state.productName.trim() === ''}
        >
          SAVE CHANGES
        </button>
      </div>
    </div>
  </div>
</div>
```

The next two fixes are my own pet peeves. I don't like seeing text without surrounding tags.

**Surround text with `<span>` tags**

```html
<div className='col-sm-12 col-md-12'>
  <div className='product-details-top'>
    <div className='col-md-4' />
    <div className='col-md-5' />
    <div className='col-md-3 no-pad-right form-group'>
      <div className='pull-right'>
        <button
          className='btn cancel-btn btn btn-default'
          id='inform-media-product-edit-product-cancel-button-1'
          type='button'
          onClick={this.handleBack}
        >
          <span>CANCEL</span>
        </button>
        <button
          className='btn btn-blue btn btn-default'
          type='submit'
          id='inform-media-product-edit-product-save-changes-button-1'
          onClick={this.updateProduct}
          disabled={this.state.productName.trim() === ''}
        >
          <span>SAVE CHANGES</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

Last fix I would like to see is to **alphabetize the tag properties**.
I don't want to find a property if the list is random.
This is more so when the property list is greater than 10.

```html
<div className='col-sm-12 col-md-12'>
  <div className='product-details-top'>
    <div className='col-md-4' />
    <div className='col-md-5' />
    <div className='col-md-3 no-pad-right form-group'>
      <div className='pull-right'>
        <button
          className='btn cancel-btn btn btn-default'
          id='inform-media-product-edit-product-cancel-button-1'
          onClick={this.handleBack}
          type='button'
        >
          <span>CANCEL</span>
        </button>
        <button
          className='btn btn-blue btn btn-default'
          disabled={this.state.productName.trim() === ''}
          id='inform-media-product-edit-product-save-changes-button-1'
          onClick={this.updateProduct}
          type='submit'
        >
          <span>SAVE CHANGES</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

Some of you may notice the two self-closing tags are unnecessary.
As you may or may not be aware, we are using [Bootstrap](https://getbootstrap.com/).
Bootstrap contains "offset" classes that can be used to replace those first two column `<div>`.
I didn't address this because the developer may plan to use it.
It's more simple for me to note that in my review notes to the developer than to tell them to make those changes.
If that developer chooses to keep it, they can leave a comment as to why it is left that way.

