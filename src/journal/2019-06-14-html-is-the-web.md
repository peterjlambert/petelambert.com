---
title: HTML is the Web
date: 2019-06-14T15:15:18+01:00
slug: html-is-the-web
excerpt: >
 In which I lament the fact that many frontend Web engineers don't understand the end product of their work, HTML.
keywords:
  - Web Design
  - HTML
  - Javascript
  - React
  - JSX
  - Rant
  - Semantics
  - Accessibility
  - UX
  - Usability
  - Performance
---

What’s the story with Frontend Engineers and HTML these days? I’ve been speaking to quite a few recently who just don’t seem to understand it. I mean, they understand some of it. They understand what a `div` is and what a `span` is, and as long as it all looks good and works when they click on it, they’re happy enough. So many that I’ve spoken to have answered questions about HTML with things like “Oh, I do everything in React or Vue these days”. But really, it doesn’t matter if all you write is Javascript, because if you’re making websites then the most important thing you’re making is HTML. HTML _is_ the Web

It’s all about what gets consumed by the consumer. It’s the UI and UX. It’s the whole package. In descending order of importance it's the HTML, the CSS, and the behaviour (which might be provided by the Javascript - might not be).

My big concern is at the bottom of that technology pyramid. The lowest common denominator of the Web. The foundation. The rhythm section. The ladyfingers in the Web trifle. It’s the HTML.  And it is becoming increasingly clear to me that there’s a whole swathe of _Frontend Engineers_ who don’t know or understand the frontend-est of frontend technologies.

A Web page is a document. A component, whether it’s part of a blog template, a news site, a marketing stats dashboard or a sign-up form, is a part of a document. Documents have structure. On the Web, that’s not just about the visuals or the architecture provided by your framework, it’s about choosing semantically correct elements to that make sure that your Web page, component, whatever, is correctly structurally formatted. Headings should be headings, lists should be lists, buttons should be buttons and tables should be tables. You can style them (pretty much) however you like - a heading doesn’t have to be big and bold with a bottom margin. That’s up to you, but it should definitely be a heading and I’ll fight you if you make it a `div`.

HTML is not hard to learn properly, especially if you’re already accustomed to learning Javascript frameworks. I haven’t counted, but I’m pretty sure there’s only about 116 elements, and most of those you’d never normally need. Why would you not learn it?

I’m a ‘frontend of the frontend’ kind of guy. My expertise is in HTML and CSS, so it’s easy for me to wax lyrical about why everybody should learn what I already know (for the record, I don’t know it all - we still have heated debates in the office about what the best way to mark up a certain component might be). This isn’t about ‘my job’s more important than yours. If you’re writing code that renders things in a browser, this _is_ your job.

It’s about usability and accessibility. If you don’t think the semantic structure of your Web page or app is important then you’re essentially saying “Well, it works for me in my browser, ship it”. I don’t think you’d do that with your Javascript and you certainly shouldn’t be doing it with your CSS. Search engines need to read your content, not enjoy your swoopy animations or fancy gradients. Screen reader software needs to read your content. Keyboard users need to read your content. Who knows what technology will come next and how it will consume your app but I’ll bet my bottom Bitcoin it’ll work better if it can easily read, parse and traverse your content. The way these things read your content is that they know it’s actually content and not just strings of text wrapped in meaningless tags. They know what’s a table and how to present it, they know what’s a list and how to present it, they know what’s a button and what’s a checkbox. Make everything from `div`s and they’re going to have to work bloody hard to figure that out.

> “But my framework of choice takes care of all that. I just write `.jsx` templates.”

Nope. Write proper HTML in your JSX. You can do it. Just because you’re using React or Vue or whatever else, you don’t have to make everything from `div`s. You don’t.

> “This library adds WAI-Aria attributes to everything so I know it’s accessible because they’ve already done the work.”

Great. If you’d written proper HTML, most of those attributes wouldn’t be necessary at all. You get a whole heap of accessibility features for free just by using a real `button` instead of a `div` with an `onClick` listener. For FREE. That’s accessibility and performance and user experience points, for free. FREE!

This stuff really matters. Not doing this stuff is slowly (actually not that slowly) breaking the World Wide Web. At the very least it’s making it more difficult to use for the people who would use your product. If you call yourself a frontend engineer, it’s your responsibility to learn and use the basics - the one thing that’s common across every browser, platform, device or household appliance that can access the Web.

Please do this. Make the Web a better place by building it responsibly. There’s a Web full of resources that can help you to do it, but here’s a few for starters:

* Learn how to markup a document in HTML. Try little thought exercises where you look at a concert poster or a newspaper page and imagine how it would be structured in HTML. If you have time, build it. Use those learnings in your day-to-day work.
* [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML) is a great resource for blog posts, tutorials and references.
* Reach out to people in the community. Read blog posts (like Andy Bell’s recent post about using semantic HTML, [Keep it simple](https://andy-bell.design/wrote/keep-it-simple/)) and [watch videos](https://css-tricks.com/video-screencasts/58-html-css-the-very-basics/).
* When I was coming up, *View Source* was still useful. We’ve collectively broken that for current and future generations, but I would impress upon you the power that comes with knowing [how to use a browser’s dev tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)
* Find out about [how assistive technologies access the Web](https://www.smashingmagazine.com/2019/02/accessibility-webinar/)
* Look at the [HTML specs](https://www.w3.org/TR/html52/), or even just at a list of [HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) and their uses.
* If you work in a team of developers, have discussions about markup. Have lively conversations about whether _something_ should be a `table` or a `dl`
([The Description List Element - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl)). It’s great fun, I promise.
* Find out who the HTML expert in your team is and ask them to review your code. If that person is me, I’m always happy to have that discussion.

If you'd like to discuss any of this, I'm happy to have that chat. See my [contact page](https://www.petelambert.com/contact) for ways to get in touch.
