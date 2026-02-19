import Router from "./core/router";
import { NewsFeedView, NewsDetailView } from './page';
import Store from './store';  
import { NewsFeedApi, NewsDetailApi, Api, applyApiMixins } from "./core/api";

const store = new Store();
const router:Router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);

applyApiMixins(NewsFeedApi, [Api]);
applyApiMixins(NewsDetailApi, [Api]);

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();