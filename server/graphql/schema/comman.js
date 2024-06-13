module.exports = `
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION


type error{
    name: String!
    message: String! 
  }

  type PAGE_INFO{
    totalRecords: Int,
    pageLimit: Int,
  }

  type saveDataResult{
    publicId: String,
    message: String,
  }
  
  type result{
    errors: [ error ],
    data: saveDataResult
  }
`;
