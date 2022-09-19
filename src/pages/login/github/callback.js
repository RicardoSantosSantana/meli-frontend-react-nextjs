export default function callback(props){

    console.log(props);
    return ( " CALLBACK")

}

export async function getServerSideProps({ req, res }) {
    console.log( req, res)
    return {
      props: {}, // will be passed to the page component as props
    }
  }