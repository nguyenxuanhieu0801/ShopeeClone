import { ComponentStory, ComponentMeta } from '@storybook/react';
import Login from './Login';
import { routes } from '~/constants';
import AuthLayout from '~/layouts/AuthLayout';

export default {
  title: 'pages/Login',
  component: Login
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => {
  return <Login />;
};

export const Primary = Template.bind({});

Primary.story = {
  parameters: {
    reactRouter: {
      routePath: routes.login
    }
  }
};

export const LoginPage: ComponentStory<typeof Login> = () => (
  <AuthLayout>
    <Login />
  </AuthLayout>
);
LoginPage.story = {
  parameters: {
    reactRouter: {
      routePath: routes.login
    }
  }
};
