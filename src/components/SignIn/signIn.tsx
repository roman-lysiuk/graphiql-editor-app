// import React from 'react';
// import { RefTypes } from '../../interfaces';

// const SignIn = (props: RefTypes) => (
//   <div className="formPage">
//     <form className="form" onSubmit={handleSubmit(onSubmit)}>
//       <label className="label">
//         Email:
//         <input
//           className="input"
//           type="text"
//           // {...register('email')}
//           {...register('email', {
//             required: {
//               value: true,
//               message: 'Please enter your Email',
//             },
//             pattern: {
//               value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
//               message: 'Please enter correct Email',
//             },
//           })}
//         />
//       </label>
//       <p className={`form-control ${errors.email ? 'errDis' : 'errMess'}`}>
//         {errors.email?.message}
//       </p>
//       <label className="label">
//         Login:
//         <input
//           className="input"
//           type="text"
//           {...register('login', {
//             required: {
//               value: true,
//               message: 'Please enter your Login',
//             },
//             pattern: {
//               value: /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g,
//               message: 'Please enter correct Login',
//             },
//           })}
//         />
//       </label>
//       <p className={`form-control ${errors.login ? 'errDis' : 'errMess'}`}>
//         {errors.login?.message}
//       </p>
//       <button className="googleBtn" />
//       <input className="submit" type="submit" value="SEND" />
//     </form>
//   </div>
// );

// export default SignIn;
