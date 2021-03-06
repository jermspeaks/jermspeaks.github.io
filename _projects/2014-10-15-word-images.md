---
layout: project-page
title: Word Images
permalink: /projects/word-images
name: Word to Image App
description: Given a word, display images of that word and related words.
  Part of my code challenge for Reverb.
# project_link: https://github.com/jermspeaks/word-images
created_date: 2014-10-15
---

# Word to Image App

When you search for a word, it displays the images for that word and related words. The application is supposed to show related images, so that will be on the next revision.

[Github Project Page](https://github.com/jermspeaks/word-images)

![Word to image app screenshot](/assets/images/word-image.png)

### Technologies:

* AngularJS
* NodeJS
* ExpressJS
* Bootstrap

### Libraries:

* [X2JS](https://code.google.com/p/x2js/) - Flickr API outputs XML, and AngularJS is very JSON-centric, so I decided to convert the XML to JSON using this library. The XML data has proper headers, so no customization was needed.

### Data:
* Wordnik API
* Flickr API
