import type { NextPage } from "next";
import Head from "next/head";
import { CreateView } from "../views";

const Basics: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Token</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <CreateView />
    </div>
  );
};

export default Basics;
