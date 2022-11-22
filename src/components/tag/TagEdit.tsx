import { Dialog } from 'vant';
import { defineComponent, reactive } from 'vue';
import { routerKey, useRoute, useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const onError = ()=>{
      Dialog.alert({ title:'提示',message:'删除失败' })
    }
    const router = useRouter()

    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onDelete = async (options?: {withItems?: boolean}) => {
      await Dialog.confirm({
        title: '确认',
        message:'你真的要删除吗？'
      })
      await http.delete(`/tags/${numberId}`, {
        withItems: options?.withItems ? 'true' : 'false'
      }).catch(onError)
      router.back()
    }
    const onSubmit = (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      e.preventDefault()
    }
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if(Number.isNaN(numberId)){
      return ()=> <div>id 不存在</div>
    }
    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: <BackIcon />,
        default: () => <>---
          <TagForm id={numberId} />111
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags} onClick={() => onDelete()}>删除标签</Button>
            <Button level='danger' class={s.removeTagsAndItems} onClick={()=>onDelete({withItems: true})}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})

