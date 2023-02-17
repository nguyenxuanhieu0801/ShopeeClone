import { yupResolver } from '@hookform/resolvers/yup';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { routes } from '~/constants';
import useQueryConfig from './useQueryConfig';

const schema = yup
  .object({
    name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
  })
  .required();

type FormSearch = yup.InferType<typeof schema>;

const useSearchProducts = () => {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormSearch>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        };
    navigate({
      pathname: routes.home,
      search: createSearchParams(config).toString()
    });
  });

  return { onSubmitSearch, register };
};

export default useSearchProducts;
