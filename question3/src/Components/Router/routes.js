import HomePage from '../Pages/HomePage';
import CreateQuery from '../Pages/CreateQuery';
import ManageQueries from '../Pages/ManageQueries';

const routes = {
  '/': HomePage,
  '/queries/create': CreateQuery,
  '/queries': ManageQueries
};

export default routes;
