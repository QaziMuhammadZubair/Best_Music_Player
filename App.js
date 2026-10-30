import {NavigationContainer} from '@react-navigation/native'
import Audioprovider from './app/Context/Audioprovider'
import App_navigation from './app/navigation/App_navigation'
export default function App() {
  return(
   <Audioprovider>
    <NavigationContainer>
     <App_navigation/>
    </NavigationContainer>
  </Audioprovider>
  );
}

