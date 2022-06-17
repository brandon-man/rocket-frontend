import Head from "next/head";

function Meta({
  title = "Rocket",
  description = "Web3 app with Solidity smart contract.",
}) {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

export default Meta;
