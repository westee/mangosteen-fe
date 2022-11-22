import axios, { AxiosResponse } from "axios";
import { defineComponent, PropType, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { BackIcon } from "../shared/BackIcon";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { http } from "../shared/Http";
import { Icon } from "../shared/Icon";
import { refreshMe } from "../shared/me";
import { hasError, validate } from "../shared/validate";
import s from "./SignInPage.module.scss";
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const refValidationCode = ref<any>();
    const router = useRouter();
    const route = useRoute();

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );

      if (!hasError(errors)) {
        const res = await http
          .post<{ jwt: string }>(
            "/session",
            formData
          )
          .catch(onError);
          console.log(res);
          
        localStorage.setItem("jwt", res.data.jwt);
        // router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString();
        refreshMe();
        router.push(returnTo || "/");
      }
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };
    const onCLickSendValidationCode = async () => {
      if (!formData.email) return;
      const res = await http
        .post("/validation_codes", {
          email: formData.email,
        })
        .catch(onError);
      console.log(res);

      refValidationCode.value.startCount();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <BackIcon />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                />
                <FormItem
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
                  onClick={onCLickSendValidationCode}
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  ref={refValidationCode}
                />
                <FormItem style={{ paddingTop: "96px" }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
