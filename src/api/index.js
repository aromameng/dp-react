const baseUrl=__API__
const mockUrl=__MOCK__
export default {
    search:baseUrl+'/pixiv/v1/',
    getNewsList:baseUrl+'/pixiv/v1/?type=latest',
    test:baseUrl + '/users/',
    getRecommendList:mockUrl+'/api/homelist',
    getLikeList:mockUrl+'/api/homelike',
}