import Layout from "@/components/Layout";
import AuthForm from "@/components/login/AuthForm";
import { Theme } from "@radix-ui/themes";
import React from "react";

const page = () => {
  return (
    <>
      <Layout headerStyle={3} footerStyle={3}>
        <Theme>
          <AuthForm />
        </Theme>
      </Layout>
    </>
  );
};

export default page;
