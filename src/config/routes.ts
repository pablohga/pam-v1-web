import { DashboardScreen } from '../screens/DashboardScreen';
import Home from '../screens/Home';
import Login from '../screens/Login';

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: '',
    component: Home,
    name: 'Home Screen',
    protected: true
  },
  {
    path: '/login',
    component: Login,
    name: 'Login Screen',
    protected: false
  },
  {
    path: '/dashboard',
    component: DashboardScreen,
    name: 'Dashboard',
    protected: true
  },
  {
    path: '/home',
    component: Login,
    name: 'Home Screen PAM V1',
    protected: true
  },
  {
    path: '/prompt-new',
    component: Login,
    name: 'Novo Prompt',
    protected: false
  }
];

export default routes;
