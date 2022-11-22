import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Icon } from '../../shared/Icon';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: <BackIcon />,
        default: () => (
          <TagForm />
        )
      }}</MainLayout>
    )
  }
})