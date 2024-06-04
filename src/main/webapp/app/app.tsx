import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Breadcrumb, Layout, theme } from 'antd';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import Sidebar from 'app/shared/layout/sidebar/sidebar'; // Import the Sidebar component

const { Header: AntHeader, Content } = Layout;

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, [dispatch]);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container">
        <Layout>
          <Header
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            currentLocale={currentLocale}
            ribbonEnv={ribbonEnv}
            isInProduction={isInProduction}
            isOpenAPIEnabled={isOpenAPIEnabled}
          />
          <Layout style={{ paddingTop: 80 }}>
            <Sidebar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
            <Layout>
              <Content
                style={{
                  padding: 24,
                  paddingTop: 0,
                  margin: 0,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <ToastContainer position="top-left" className="toastify-container" toastClassName="toastify-toast" />
                <ErrorBoundary>
                  <AppRoutes />
                </ErrorBoundary>
              </Content>
              <Footer />
            </Layout>
          </Layout>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
