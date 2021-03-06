angular.module('classeur.blogs.blogger', [])
  .directive('clBloggerBlogForm',
    function () {
      return {
        restrict: 'E',
        templateUrl: 'blogs/blogger/bloggerBlogForm.html'
      }
    })
  .directive('clBloggerBlogPostEntry',
    function () {
      return {
        restrict: 'E',
        templateUrl: 'blogs/blogger/bloggerBlogPostEntry.html'
      }
    })
  .directive('clBloggerBlogPostForm',
    function () {
      return {
        restrict: 'E',
        templateUrl: 'blogs/blogger/bloggerBlogPostForm.html'
      }
    })
  .factory('clBloggerBlogPlatform',
    function (clBlogPlatform, clConfig, clUrlSanitizer) {
      var clBloggerBlogPlatform = clBlogPlatform({
        id: 'blogger',
        name: 'Blogger',
        enabled: !!clConfig.googleClientId,
        authorizeUrl: 'https://accounts.google.com/o/oauth2/auth'
      })

      clBloggerBlogPlatform.createBlogFromSubForm = function (subForm) {
        var blogUrl = clUrlSanitizer(subForm.blogUrl)
        if (!blogUrl) {
          throw new Error('Blog URL is invalid.')
        }
        if (blogUrl > 256) {
          throw new Error('Repository URL is too long.')
        }
        return {
          blogUrl: blogUrl
        }
      }

      clBloggerBlogPlatform.createPostFromSubForm = function (subForm) {
        if (subForm.postId && subForm.postId.length > 128) {
          throw new Error('Post ID is too long.')
        }
        return {
          postId: subForm.postId
        }
      }

      clBloggerBlogPlatform.properties = [
        'title',
        'tags',
        'published',
        'date'
      ]

      clBloggerBlogPlatform.getAuthorizeParams = function () {
        return {
          client_id: clConfig.googleClientId,
          response_type: 'code',
          redirect_uri: clConfig.appUri + '/oauth/blogger/callback',
          access_type: 'offline',
          scope: 'https://www.googleapis.com/auth/blogger profile email'
        }
      }

      clBloggerBlogPlatform.getBlogPostLocation = function (blogPost) {
        return [
          'https://www.blogger.com/blogger.g?blogID=',
          blogPost.blog.blogId,
          '#editor/target=post;postID=',
          blogPost.postId
        ].join('')
      }

      return clBloggerBlogPlatform
    })
