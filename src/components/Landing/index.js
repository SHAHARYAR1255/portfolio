import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

function LandingPage() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useEffect");
    const fetchRepos = async () => {
      setLoading(true);
      await fetch("https://api.github.com/users/SHAHARYAR1255/repos")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "data");
          setData(data);
          setLoading(false);
          console.log("loading ", loading);
        })
        .catch((err) => {
          setError(err);
          console.log(err, "err");
        });
    };

    fetchRepos();
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });
  const classNamees = useStyles();
  return (
    <div>
      {!loading ? (
        // <TableContainer component={Paper}>
        //   <Table classNameName={classNamees.table} aria-label="simple table">
        //     <TableHead>
        //       <TableRow>
        //         <TableCell align="center">id</TableCell>
        //         <TableCell align="center">name</TableCell>
        //         <TableCell align="center">url</TableCell>
        //         <TableCell align="center">language</TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <ShowDetails data={data} />
        //   </Table>
        // </TableContainer>

        // <div className="md:container md:mx-auto">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="w-1/3np px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Language
                      </th>
                      <th
                        scope="col"
                        className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Url
                      </th>
                      {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th> */}
                      {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                    </tr>
                  </thead>
                  <ShowDetails data={data} />
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // </div>
        <div>loading...</div>
      )}
    </div>
  );
}

export default LandingPage;

const ShowDetails = ({ data }) => {
  console.log(data, "data showDetails");
  if (data !== undefined || null) {
    // return (
    //   <TableBody>
    //     {data.map((dat, index) => {
    //       return (
    //         <TableRow key={dat.id}>
    //           <TableCell align="center">{index +1}</TableCell>
    //           {/* <TableCell align="center" component="th" scope="row">
    //             {dat.id}
    //           </TableCell> */}
    //           <TableCell align="center">{dat.name}</TableCell>
    //           <TableCell align="center">{dat.url}</TableCell>
    //           <TableCell align="center">{dat.language}</TableCell>
    //         </TableRow>
    //       );
    //     })}
    //   </TableBody>
    // );
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((da) => {
          return (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {/* {/* <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                      alt=""
                    />
                  </div> */}
                  {/* <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {da.url}
                    </div>
                    <div className="text-sm text-gray-500">{da.language}</div>
                    <div className="text-sm text-gray-500">{da.id}</div>
                  </div> */}
                  <div className="text-sm text-gray-500">{da.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm">{da.language}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-xs">{da.url}</div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  } else {
    return <TableBody></TableBody>;
  }
};

//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     Regional Paradigm Technician
//                   </div>
//                   <div className="text-sm text-gray-500">Optimization</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                     Active
//                   </span>
//                 </td>
//                 {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   Admin
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                     Edit
//                   </a>
//                 </td> */}
//               </tr>

//               {/* <!-- More rows... --> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
