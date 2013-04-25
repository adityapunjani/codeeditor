module.exports = function routes() {
  this.root('editor#generate');
  this.match('/editor/new', { controller: 'editor', action: 'generate' });
  this.match('/editor/:slug', { controller: 'editor', action: 'main' });
}
