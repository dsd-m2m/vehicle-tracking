const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTION: 'OPTION'
  };
  
  module.exports.config = {
    protect: [
      {
        path: '/api',
        methods: [methods.POST, methods.GET, methods.PUT],
        rols: ['user']
      }
    ]
  };
  