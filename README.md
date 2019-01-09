A tiny library meant to scratch a personal itch.

If you want to test promise rejections in Chai, you can, but you need
boilerplate. This package provides the boilerplate.

Background
==========

I've gradually been phasing ``chai-as-promised`` out of my test suites. I used
it a lot and even contributed substantial code to it but the use of
``async/await`` has lessened the need for it, and the direction
``chai-as-promised`` has been taking lately is not to my liking. At this point,
the only thing that ``chai-as-promised`` can concisely do that Chai and
``async/await`` cannot is test rejections.

So I've been using boilerplate to test rejections in this test suite, and that
test suite, and that other suite, etc. I'm tired of the code duplication. Hence
this library.

FAQ
===

Q. Why [...] ?

A. An overarching answer to just about any "why..." question is "because this
library is meant to scratch a *personal itch*." Many of my libraries are aiming
to reach a wider audience, but not this one.

Q. Why TypeScript? Isn't this too small a library to bother with TS?

A. I'm using TS a lot. So I want a TS definition files but I don't like
maintaining such files manually. So, yeah the source is in TS and I
automatically get definition files from it. You can still use the library with
plain JS if you want.

Q. Why not a Chai *plugin*?

A. I cannot be bothered. I've had the experience of dealing with the intricacies
of Chai plugins. I'd rather not revisit. If you want to create a Chai plugin
from this code, have at it.
