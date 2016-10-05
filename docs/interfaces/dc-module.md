interface DataCalcModule {

    DataCalc init()

    PluginDataCalcModule extends DataCalcModule plugin(String pluginName, Object pluginConfig)

}
