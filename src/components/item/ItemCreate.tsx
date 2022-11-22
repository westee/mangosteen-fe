import { AxiosError } from 'axios';
import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { useTags } from '../../shared/useTags';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    const { tags: incomeTags,
      hasMore: hasMore2,
      fetchTags: fetchTags2
    } = useTags((page)=> {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })
    const refTagId = ref<number>()
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>(0)
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happened_at: new Date().toISOString(),
    })
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        })
      }
      throw error
    }
    const onSubmit = async () => {
      console.log(formData);
      // formData.kind = formData.kind == '支出' ? 1 : 2
      // const {
      //   tags_id,amount,happened_at
      // } = formData
      // const kind = formData.kind == '支出' ? 1 : 2
      await http.post('/items', 
      formData,
      // {tags_id, amount, happened_at, kind},
       {params: {_mock: 'itemCreate'}})
        .catch(onError)
        router.push("/items")
    }
    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: <BackIcon />,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name="支出" class={s.tags_wrapper}>
                <Tags kind="expense" v-model:selected={formData.tags_id[0]} />
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <Tags kind="income" v-model:selected={formData.tags_id[0]} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad v-model:happenAt={formData.happened_at} v-model:amount={formData.amount} onSubmit={onSubmit} />
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})