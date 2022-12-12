import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notice from './notification'
import list from './list'
import menu from './menu'
import infiniteMenu from './infiniteMenu'
import progress  from './progress'
import chooseDate from './chooseDate'
import chooseTime from './chooseTime'
import chooseCity  from './chooseCity'
import table from './table'
import form from './form'
import modalForm from './modalForm'

const components = [
    chooseArea,
    chooseIcon,
    trend,
    notice,
    list,
    menu,
    infiniteMenu,
    progress,
    chooseTime,
    chooseDate,
    chooseCity,
    table,
    form,
    modalForm
]
export default{
    install(app:App){
        components.map(item =>{
            app.use(item)
        })
    }
}