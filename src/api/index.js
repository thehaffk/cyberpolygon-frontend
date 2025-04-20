import authApi from './auth';
import axiosInstance from './axiosInstance';
import rubricsApi from './rubrics';
import articlesApi from './articles';
import { TerminalWebSocket, getTerminalUrl } from './terminal';
import * as testsApi from './tests';

export {
  authApi,
  axiosInstance,
  rubricsApi,
  articlesApi,
  TerminalWebSocket,
  getTerminalUrl,
  testsApi
};

export default {
  authApi,
  axiosInstance,
  rubricsApi,
  articlesApi,
  TerminalWebSocket,
  getTerminalUrl,
  testsApi
}; 