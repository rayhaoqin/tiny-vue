<!--
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 -->

<template>
  <transition name="tiny-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div v-show="state.visible" class="tiny-time-range-picker tiny-picker-panel tiny-popper" :class="state.popperClass">
      <div class="tiny-time-range-picker__content">
        <div class="tiny-time-range-picker__cell">
          <div class="tiny-time-range-picker__header">
            {{ t('ui.datepicker.startTime') }}
          </div>
          <div
            :class="{
              'has-seconds': state.showSeconds,
              'is-arrow': state.arrowControl
            }"
            class="tiny-time-range-picker__body tiny-time-panel__content"
          >
            <time-spinner
              ref="minSpinner"
              :show-seconds="state.showSeconds"
              :am-pm-mode="state.amPmMode"
              @change="handleMinChange"
              :arrow-control="state.arrowControl"
              @select-range="setMinSelectionRange"
              :date="state.minDate"
            >
            </time-spinner>
          </div>
        </div>
        <div class="tiny-time-range-picker__cell">
          <div class="tiny-time-range-picker__header">
            {{ t('ui.datepicker.endTime') }}
          </div>
          <div
            :class="{
              'has-seconds': state.showSeconds,
              'is-arrow': state.arrowControl
            }"
            class="tiny-time-range-picker__body tiny-time-panel__content"
          >
            <time-spinner
              ref="maxSpinner"
              :show-seconds="state.showSeconds"
              :am-pm-mode="state.amPmMode"
              @change="handleMaxChange"
              :arrow-control="state.arrowControl"
              @select-range="setMaxSelectionRange"
              :date="state.maxDate"
            >
            </time-spinner>
          </div>
        </div>
      </div>
      <div class="tiny-time-panel__footer">
        <button type="button" class="tiny-time-panel__btn cancel" @click="handleCancel()">
          {{ t('ui.datepicker.cancel') }}
        </button>
        <button type="button" class="tiny-time-panel__btn confirm" @click="handleConfirm()" :disabled="state.btnDisabled">
          {{ t('ui.datepicker.confirm') }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="tsx">
import { renderless, api } from '@opentiny/vue-renderless/time-range/vue'
import { $prefix, setup, defineComponent } from '@opentiny/vue-common'
import TimeSpinner from '@opentiny/vue-time-spinner'

export default defineComponent({
  name: $prefix + 'TimeRange',
  emits: ['dodestroy', 'pick', 'select-range'],
  components: { TimeSpinner },
  props: {
    emitter: Object
  },
  setup(props, context) {
    return setup({ props, context, renderless, api, mono: true })
  }
})
</script>
