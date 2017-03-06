---
layout: letter
category: letters
title: 'On Validation'
date: 2016-03-14
tags: [season_1, letters]
permalink: /:categories/:title.html
---

# On Validation

In my quest in developing my data visualization skills, I’m finding validation to be a common interdisciplinary concept. For example, in music, you validate hitting the right notes, keeping beat, and listening to your pitch. In engineering problems, you validate theoretical calculations with empirical data. In business, you validate the business needs with return of investment calculations and customer satisfaction with surveys or field studies. In relationships, we’re validating our perception of the other person. Along the way, when we forget to validate our performance, assumptions, or perceptions, we falter. We play a terrible piano recital. We cause downstream problems in the production line. We take a loss in next quarter’s revenue. We begin to distance ourselves from who we love.

We can classify validation as passive and active. Passive validation is when we gain validation without expecting it. A core essential of validation is feedback loops. Feedback loops are outcomes of validations that when triggered, feed back to the process. Test driven development embraces this by having the developer write tests before code. The rule of thumb is “red, green, refactor”. Red refers to running the test and seeing it fail. Typically, when tests fail, the printed output is red. Green means to write code and see if the tests pass. Typically, passing tests are printed green. Refactor means trying to make that code you just wrote more robust. “Could this piece of code be written better.” Because you already wrote the test, and the code you wrote works, refactoring does not harm. In fact, if your refactored code does not work, the test will give you feedback, invalidating your new code. At that point, you can revert back to the old code.

Active validation requires an effort to test our perceptions. In my data visualization journey, I’m learning how validation works at each level of the process. At the top level, a visual designer asserts the problems of a target user and determines if this problem is best supported with a visualization tool. As a developer, I find myself missing this step of domain validation. Jumping straight to code before thinking about the end user is a smell of disaster. You may be solving the wrong problem or generating a new problem for the user. The old adage that more technology is better is not true. It reminds me of the film, “This Is Spinal Tap” where one of the band members shows the documentarian that his amp goes to 11. The documentarian asks, “Why don't you just make ten louder and make ten be the top number and make that a little louder?” The band member replies, "These go to eleven.” Building tools for the tool’s sake is missing the mark.

I hate to admit it, but I find myself relying on intuition rather than verification. It takes energy to validate your intuition. But while this may be a short-term loss, it’s a long-term gain, and humans find it hard to perceive long-term gains. This is where awareness can come in handy. Without awareness, we can let confirmation bias get the better of us. Confirmation bias is the fallacy of using purely coincidental evidence to confirm our intuition. With a heightened awareness, we force ourselves to realize we’re making a confirmation bias, and we must validate what we are thinking. Here’s an example. Why do some voters want Trump to be the next president of the US? I find this question really difficult to answer. I’m not a Trump supporter, so I made my own hypotheses. But, I haven’t talked to a single Trump supporter, so my hypotheses will not get validated. Having awareness means while I think I know what’s going on, I don’t have the slightest clue, and I’m painfully aware of that fact. If I wanted to know, I’d go to a Trump rally, interview some of the supporters, look at polls and surveys on the demographics of the voters, and ask experts.

Validation applies to teams. In a production line, you want to decrease your batch size and intervals of work. At each stage, there are feedback loops that validate whether each batch is valid. The result is an increase flow in production. When I was manufacturing stents, each batch size was small enough where we would only sample 5 to 10 parts per each stage of the process. Of course, final quality assurance checks 100% at the very end. If the parts were invalid at a stage, the batch would be removed from the production line and another batch would be added to the production line. The outcome was a faster output and better worker satisfaction. When you don’t have checks at each stage, errors get downstream, meaning a bad batch would waste time in production because you wouldn’t find out until the final quality assurance checkpoint.

Here’s an action to takeaway. Find one problem you’re repeatedly doing. Propose a solution to that problem. Purposely try to make that problem happen again. If it doesn’t happen, you’ve properly validated your solution. If not, propose another solution and try again.

#### Footnotes

1. [The Pragmatic Programmer](https://pragprog.com/book/tpp/the-pragmatic-programmer) is full of tips like “Coding ain’t done until all the tests run”.
“Red, Green, Refactor” is a corollary to this.
1. Although I only brushed over the top level, there are three other levels.
Tamara Munzner writes in her textbook, [Visual Analysis and Design](https://www.cs.ubc.ca/~tmm/vadbook/), about the four types of validation.
They are domain validation, abstraction validation, idiom validation, and algorithm validation.
Abstraction validation is testing the translation between domain terms and visual data terms.
Idiom validation is testing the right tool for the right job.
Algorithm validation is benchmarking the algorithms and determining if they’re performant.
1. The production line example is loosely taken from the three ways described in the book,
"[The Phoenix Project](http://itrevolution.com/books/phoenix-project-devops-book/)",
which describes software and dev-ops as a production line.
It’s worth a read if you’re in software and you’re having issues in your team’s pipeline.
