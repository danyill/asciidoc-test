const srcMacro = function () {
    const self = this
    self.named('src')
    self.parseContentAs('text')
    // self.$option('content_model', 'text')
    self.process(function (parent, target, attrs) {
        const lang = target
        console.log(attrs['text'])
        const text = `<code class="language-${lang} inline" data-lang="${lang}" title="${lang}">${attrs['text']}</code>`
        // return self.createInline(parent, 'quoted', text, { 'type': 'strong' }).convert()
        // opts = {'type': 'monospaced'}
        opts = {}
        return self.createInline(parent, 'quoted', text)
        // , opts)
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

// create_inline parent, :quoted, attrs['text'], type: :monospaced, attributes: { 'role' => %(language=#{target} inline) }

// Asciidoctor::Extensions.register do
//   inline_macro do
//     named :src
//     parse_content_as :text
//     process do |parent, target, attrs|
//       html = %(<code class="language-#{target} inline" data-lang="#{target}">#{attrs['text']}</code>)
//       create_inline_pass parent, html
//     end
//   end
// end