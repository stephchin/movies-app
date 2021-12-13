import { Layout } from "antd";
import React from "react";
import Movies from "./Movies";

import 'antd/dist/antd.css';

const { Content } = Layout;

export default () => (
  <Layout className="layout">
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content" style={{ margin: "100px auto" }}>
        <h1>Now Playing</h1>
        <Movies />
      </div>
    </Content>
  </Layout>
);
