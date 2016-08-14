define({ "api": [  {    "type": "get",    "url": "/api/users",    "title": "",    "name": "GetUsers",    "group": "User",    "permission": [      {        "name": "none"      }    ],    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/api/user",    "title": "",    "name": "PostUser",    "group": "User",    "permission": [      {        "name": "none"      }    ],    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/api/user/:id",    "title": "",    "name": "PostUser",    "group": "User",    "permission": [      {        "name": "none"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>The Users-ID.</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://localhost:3000/api/user/4",        "type": "json"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>The Users-ID.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>The Users-username.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>The Users-password.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "admin",            "description": "<p>The Users-permission admin.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>The Users-email.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "firstname",            "description": "<p>The Users-firstname.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "lastname",            "description": "<p>The Users-lastname.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "User"  },  {    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "varname1",            "description": "<p>No type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "varname2",            "description": "<p>With type.</p>"          }        ]      }    },    "type": "",    "url": "",    "version": "0.0.0",    "filename": "./doc/main.js",    "group": "_Users_pawelchoniawko_WebstormProjects_planer_server_doc_main_js",    "groupTitle": "_Users_pawelchoniawko_WebstormProjects_planer_server_doc_main_js",    "name": ""  }] });
