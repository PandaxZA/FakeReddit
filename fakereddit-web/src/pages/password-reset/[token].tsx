import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { NextComponentType, withUrqlClient, WithUrqlProps } from "next-urql";
import { useRouter } from "next/router";
import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

export const PasswordReset: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassoword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassoword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="newPassword"
              label="New Password"
              type="password"
            ></InputField>
            {tokenError ? <Box color="red">{tokenError}</Box> : null}
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

PasswordReset.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  PasswordReset as FunctionComponent<
    PropsWithChildren<WithUrqlProps | { token: string }>
  >
);
