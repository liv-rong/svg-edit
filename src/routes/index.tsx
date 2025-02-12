import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "antd";
import Header from "@/components/Header";
import Option from "@/components/Operate";
import Canvas from "@/components/Canvas";
const { Content } = Layout;
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout className="w-screen h-screen">
      <Header></Header>
      <Layout>
        <Option />
        <Content className="overflow-y-auto">
          <Canvas />
        </Content>
      </Layout>
    </Layout>
  );
}
