import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import bgLogin from '../public/images/login/bg_login_page.png';
import WereWolfLogotype from '../public/images/silence_logotype.png';
import CustomButton from '../src/components/_Global/Commons/Buttons';
import CustomInput from '../src/components/_Global/Commons/Inputs';
import Head from 'next/head';

function Login() {
  const [zoom, setZoom] = useState(false);

  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <section className="relative h-full w-full">
      <Head>
        <title>SL | Login</title>
      </Head>
      <div className={`fixed left-0 top-0 h-full w-full`}>
        <Image
          src={bgLogin}
          alt="Background Page Login"
          fill={true}
          quality={100}
          priority={true}
          className={`block h-auto w-full select-none !object-cover transition-transform duration-[3000ms] ease-in-out ${
            zoom ? 'scale-[700%]' : ''
          }`}
        />
        <div
          className={`absolute left-0 top-0 h-full w-full transition-all duration-[3250ms] ${
            zoom
              ? 'bg-black'
              : 'bg-gradient-to-r from-black via-transparent to-black'
          }`}></div>
      </div>
      <AnimatePresence>
        {!zoom && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute left-[50%] top-[50%] w-[500px] max-w-[90%] -translate-x-[50%] -translate-y-[50%] rounded-2xl border-2 border-black/80 bg-black/40 p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,1)] backdrop-blur-md">
            <Formik
              initialValues={{
                email: 'diego@diego.com',
                password: 'Ab1@lsjdn23',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Preencha um e-mail';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Endereço de e-mail inválido';
                }
                if (!values.password) {
                  errors.password = 'Preencha uma senha';
                } else if (
                  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
                    values.password,
                  )
                ) {
                  errors.password = 'Formato de senha inválido';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setZoom(true);
                setSubmitting(false);
                setTimeout(() => {
                  router.push('/home');
                }, 2800);
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="relative flex flex-col gap-2 pt-14">
                  <Image
                    width={150}
                    height={150}
                    src={WereWolfLogotype}
                    quality={100}
                    alt="Logotype"
                    className="absolute -top-[110px] left-[50%] -translate-x-[50%]"
                    priority
                  />
                  <div className="relative flex pb-4">
                    <CustomInput
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      customClass={
                        errors.email && touched.email && errors.email
                          ? 'border-red-500'
                          : 'border-white/40'
                      }
                    />
                    <span className="absolute -bottom-1 font-KanitBold text-xs uppercase text-red-500">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <div className="relative flex pb-4">
                    <CustomInput
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      customClass={
                        errors.password && touched.password && errors.password
                          ? 'border-red-500'
                          : 'border-white/40'
                      }
                    />
                    <span className="absolute -bottom-1 font-KanitBold text-xs uppercase text-red-500">
                      {errors.password && touched.password && errors.password}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 pt-2">
                    <CustomButton
                      outline={true}
                      loading={isSubmitting}
                      title="NOVO VIAJANTE"
                      color="warn"
                      action={{ onClick: () => router.push('/register') }}
                      type="button"
                    />
                    <CustomButton
                      loading={isSubmitting}
                      title="ENTRAR NO REINO"
                      color="danger"
                      type="submit"
                    />
                  </div>
                </form>
              )}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Login;
