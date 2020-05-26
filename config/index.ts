import DevConfig from './dev'
import BuildConfig from './build'
const config = process.env.NODE_ENV === 'production' ? BuildConfig : DevConfig

export default {
    httpBaseUrl: config.HTTP_BASE_URL,
    appName: 'rhcbtpApp',
    appSecretkey: 'rhcbtpApp888',
    appNameSpace: 'Basic '
}
