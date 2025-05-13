// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Prototype</li><li class="chapter-item expanded "><a href="prototype/index.html"><strong aria-hidden="true">1.</strong> Prototyping</a></li><li class="chapter-item expanded "><a href="prototype/blocks/index.html"><strong aria-hidden="true">2.</strong> Blocks</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="prototype/blocks/key.html"><strong aria-hidden="true">2.1.</strong> key</a></li><li class="chapter-item expanded "><a href="prototype/blocks/pad.html"><strong aria-hidden="true">2.2.</strong> pad</a></li><li class="chapter-item expanded "><a href="prototype/blocks/display.html"><strong aria-hidden="true">2.3.</strong> display</a></li><li class="chapter-item expanded "><a href="prototype/blocks/calculator.html"><strong aria-hidden="true">2.4.</strong> calculator</a></li><li class="chapter-item expanded "><a href="prototype/blocks/attribution.html"><strong aria-hidden="true">2.5.</strong> attribution</a></li><li class="chapter-item expanded "><a href="prototype/blocks/page.html"><strong aria-hidden="true">2.6.</strong> page</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">HTML/CSS to Elm</li><li class="chapter-item expanded "><a href="html-css-to-elm/index.html"><strong aria-hidden="true">3.</strong> Translating</a></li><li class="chapter-item expanded "><a href="html-css-to-elm/views/index.html"><strong aria-hidden="true">4.</strong> Views</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="html-css-to-elm/views/key.html"><strong aria-hidden="true">4.1.</strong> View.Key</a></li><li class="chapter-item expanded "><a href="html-css-to-elm/views/pad.html"><strong aria-hidden="true">4.2.</strong> View.Pad</a></li><li class="chapter-item expanded "><a href="html-css-to-elm/views/display.html"><strong aria-hidden="true">4.3.</strong> View.Display</a></li><li class="chapter-item expanded "><a href="html-css-to-elm/views/calculator.html"><strong aria-hidden="true">4.4.</strong> View.Calculator</a></li><li class="chapter-item expanded "><a href="html-css-to-elm/views/attribution.html"><strong aria-hidden="true">4.5.</strong> View.Attribution</a></li><li class="chapter-item expanded "><a href="html-css-to-elm/views/page.html"><strong aria-hidden="true">4.6.</strong> View.Page</a></li></ol></li><li class="chapter-item expanded "><a href="html-css-to-elm/reflections.html"><strong aria-hidden="true">5.</strong> Reflections on the UI</a></li><li class="chapter-item expanded affix "><li class="part-title">Application Logic</li><li class="chapter-item expanded "><a href="application-logic/index.html"><strong aria-hidden="true">6.</strong> Domain Modeling</a></li><li class="chapter-item expanded "><a href="application-logic/rational-numbers/index.html"><strong aria-hidden="true">7.</strong> Rational Numbers</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="application-logic/rational-numbers/representation.html"><strong aria-hidden="true">7.1.</strong> Representation</a></li><li class="chapter-item expanded "><a href="application-logic/rational-numbers/constructors.html"><strong aria-hidden="true">7.2.</strong> Constructors</a></li><li class="chapter-item expanded "><a href="application-logic/rational-numbers/arithmetic.html"><strong aria-hidden="true">7.3.</strong> Arithmetic</a></li><li class="chapter-item expanded "><a href="application-logic/rational-numbers/conversion.html"><strong aria-hidden="true">7.4.</strong> Conversion</a></li><li class="chapter-item expanded "><a href="application-logic/rational-numbers/unit-tests.html"><strong aria-hidden="true">7.5.</strong> Unit Tests</a></li></ol></li><li class="chapter-item expanded "><a href="application-logic/evaluating-infix-expressions/index.html"><strong aria-hidden="true">8.</strong> Evaluating Infix Expressions</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="application-logic/evaluating-infix-expressions/stack.html"><strong aria-hidden="true">8.1.</strong> Stack</a></li><li class="chapter-item expanded "><a href="application-logic/evaluating-infix-expressions/dijkstras-shunting-yard-algorithm.html"><strong aria-hidden="true">8.2.</strong> Dijkstra&#39;s Shunting Yard Algorithm</a></li><li class="chapter-item expanded "><a href="application-logic/evaluating-infix-expressions/unit-tests.html"><strong aria-hidden="true">8.3.</strong> Unit Tests</a></li></ol></li><li class="chapter-item expanded "><a href="application-logic/calculator/index.html"><strong aria-hidden="true">9.</strong> Calculator</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="application-logic/calculator/tokenizing-input.html"><strong aria-hidden="true">9.1.</strong> Tokenizing Input</a></li><li class="chapter-item expanded "><a href="application-logic/calculator/displaying-output.html"><strong aria-hidden="true">9.2.</strong> Displaying Output</a></li><li class="chapter-item expanded "><a href="application-logic/calculator/unit-tests.html"><strong aria-hidden="true">9.3.</strong> Unit Tests</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Putting It All Together</li><li class="chapter-item expanded "><a href="putting-it-all-together/index.html"><strong aria-hidden="true">10.</strong> UI + Application Logic</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="conclusion.html">Conclusion</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
