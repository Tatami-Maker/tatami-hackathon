import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import dbConnect from "../../../lib/dbConnect";
import {ParsedUrlQuery} from "querystring";
import Token, {Tokens} from "../../../model/token";
import { useRouter } from 'next/router';
import {useState} from "react";
import Head from "next/head";
import { TokenView } from "views";

interface Params extends ParsedUrlQuery {
    id: string
}

type Props = {
    token: Tokens
}

const TokenPage: NextPage = ({ token }: Props) => {
    const router = useRouter();
  
    return (
      <div>
        <Head>
          <title>Create Token</title>
          <meta
            name="description"
            content="Basic Functionality"
          />
        </Head>
        <TokenView token={token}/>
      </div>
    );
}
  
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
    params,
  }: GetServerSidePropsContext) => {
    await dbConnect()
  
    if (!params?.id) {
      return {
        notFound: true,
      }
    }
  
    const token = await Token.findOne({seq: params.id}).lean()
  
    if (!token) {
      return {
        notFound: true,
      }
    }
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const serializedToken = JSON.parse(JSON.stringify(token))
  
    return {
      props: {
        token: serializedToken,
      },
    }
}

export default TokenPage;
