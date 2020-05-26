# rhnfp-driver-app

云矿山APP

# react-native集成code-push
# 版本要求

  - react-native 0.61.5
  - code-psuh最新
  - react-native-code-push最新或0.6.0

# 项目构建(以yarn为例)

  - 构建制定版本的rn应用程序  react-native init MyApp --version 0.61.5或安装最新版本
  - 安装code-push, npm install -g code-push
  - 安装react-native-code-push，yarn add react-native-code-push


# 集成code-push，可参考官方文档说明及示例
  - 根据更新策略分为弹窗手动更新和用户无感知静默更新
  - 弹窗手动更新又分为强制更新和可选更新
  - 更新包分为增量更新和全量更新

# 项目开发
  - npm run android启动android应用程序开发

# 项目打包
  - npm run build:android-development 打包开发环境apk
  - npm run build:android-production 打包生产环境apk
  - npm run build:android-staging 打包生产环境apk

# 操作命令
  - 查看app列表 code-push app ls
  - 添加app例：code-push app add AppName android/ios react-native
  - 删除app例：code-push app remove AppName 
  - 查看app key例：code-push deployment ls AppName -k
  - 查看发布历史: code-push deployment history AppName Production/Stating
  - 上传本地初始app版本，例：code-push release-react AppName android/ios -d Production/Staging (不指定的情况下默认为Staging)
  - 发布更新，例： code-push release-react TKPetrol android -d Production --des {\""content\"":\""1.优化界面显示#2.增加新的功能模块#3.增加谷歌商店下载#4.增加静默更新参数\"",\""fullUpdate\"":false,\""isSilent\"":false} --m true。 注意: des是描述json和自定义参数，fullUpdate为是否全量更新，isSilent是否为静默更新，当fullUpdate和isSlient同时出现时，以isSilent为主
  - 更新只针对同版本比较，全量更新应用，应用商店的应用版本必须递增，否则会造成全量更新一直出现
  - 如果出现v4包不存在或者符号错误请执行如下命令解决yarn add -D jetifier, npx jetify, yarn react-native run-android