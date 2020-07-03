import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NotesList from '../pages/NotesList.vue';
import NotePage from '../pages/NotePage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/:error?',
    name: 'NotesList',
    component: NotesList,
    props: true
  },
  {
    path: '/note/:id/:edit?',
    name: 'NotePage',
    component: NotePage,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
