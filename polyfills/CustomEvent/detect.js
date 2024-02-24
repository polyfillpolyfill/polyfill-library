'CustomEvent' in self &&

// In Safari, typeof CustomEvent == 'object' but it otherwise works fine
(typeof self.CustomEvent === 'function' ||
(self.CustomEvent.toString().indexOf('CustomEventConstructor')>-1))
