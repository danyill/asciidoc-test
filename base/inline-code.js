const srcMacro = function () {
    const self = this
    self.named('src')
    self.parseContentAs('text')
    self.process(function (parent, target, attrs) {
        const lang = target
        const text = `<code class="language-${lang} inline" data-lang="${lang}" title="${lang}">${attrs['text']}</code>`
        opts = {}
        return self.createInline(parent, 'quoted', text)
    })
}

module.exports.register = function register(registry) {
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.inlineMacro(srcMacro)
        })
    } else if (typeof registry.block === 'function') {
        registry.inlineMacro(srcMacro)
    }
    return registry
}
