import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'

const Loading = ({message}) => 
    <header className={'App-header'} >
        <FontAwesomeIcon className={'App-logo logo-spin'} icon={faCircleNotch} />
        <h3 className={'mt-5'}>
            {message}
        </h3>
    </header>

export default Loading