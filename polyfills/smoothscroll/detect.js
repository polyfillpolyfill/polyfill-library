(function () {
	var supportsScrollBehaviorViaCss = ('document' in self && 'documentElement' in self.document && 'style' in self.document.documentElement && 'scrollBehavior' in document.documentElement.style);

	if (supportsScrollBehaviorViaCss) {
		return true;
	}

	var hasNativeScrollToFunction = Element.prototype.scrollTo && Element.prototype.scrollTo.toString().indexOf('[native code]') > -1;
	// If a browser has a native scrollTo implementation but does not support scroll-behavior via CSS, it is not possible to detect during runtime
	// whether smooth scrolling is supported. An example browser which has native scrollTo but does not support smooth scrolling is Safari.
	// In this situation we instead return false because it is very likely the polyfill is required.
	if (hasNativeScrollToFunction) {
		return false;
	}

	try {
		var supportsSmoothScroll = false;

		var scrollOptions = {
			top: 1,
			left: 0
		};

		Object.defineProperty(scrollOptions, 'behavior', {
			get: function () {
				supportsSmoothScroll = true;
				return 'smooth';
			},

			// Ensure this property lasts through cloning / destructuring:
			enumerable: true
		});

		var a = document.createElement('DIV');
		var b = document.createElement('DIV');
		a.setAttribute('style', 'height: 1px; overflow: scroll;');
		b.setAttribute('style', 'height: 2px; overflow: scroll;');

		a.appendChild(b);
		a.scrollTo(scrollOptions);

		return supportsSmoothScroll;
	} catch (e) {
		return false;
	}
})();
