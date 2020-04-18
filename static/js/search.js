$(function () {
  $.getJSON('/feed.json', function (res) {
    var list = res.items;

    var options = {
      isCaseSensitive: false,
      findAllMatches: false,
      includeMatches: false,
      includeScore: false,
      useExtendedSearch: false,
      minMatchCharLength: 1,
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      keys: [
        "title",
        "description"
      ]
    }

    var fuse = new Fuse(list, options)

    var App = new Vue({
      el: "#search",
      data() {
        return {
          keywords: ''
        }
      },
      computed: {
        result() {
          return fuse.search(this.keywords)
        }
      }
    })

  })
})

