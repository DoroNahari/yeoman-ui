import QuestionCheckbox from '../../../src/components/QuestionTypes/QuestionCheckbox.vue'
import { initComponent, destroy } from '../../Utils'

let wrapper

describe('QuestionCheckbox.vue', () => {
    afterEach(() => {
        destroy(wrapper)
    })

    describe('selected - data', () => {
        test('selected is empty array', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: [
                        { value: 'testValue1', name: 'testName1', checked: false, text: 'testText1' },
                        { value: 'testValue2', name: 'testName2', checked: false, text: 'testText2' }
                    ]
                },
                isAnswerValid() {
                    return '';
                }
            })

            expect(wrapper.vm.selected).toHaveLength(0)
        })

        test('selected is not empty array', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: [
                        { value: 'testValue1', name: 'testName1', checked: false, text: 'testText1' },
                        { value: 'testValue2', name: 'testName2', checked: true, text: 'testText2' }
                    ]
                },
                isAnswerValid() {
                    return '';
                }
            })

            expect(wrapper.vm.selected).toHaveLength(1)
        })
    })

    test('selected - watcher', async () => {
        wrapper = initComponent(QuestionCheckbox, {
            currentQuestion: {
                choices: [
                    { value: 'testValue1', name: 'testName1', checked: true, text: 'testText1' },
                    { value: 'testValue2', name: 'testName2', checked: true, text: 'testText2' }
                ]
            },
            isAnswerValid() {
                return '';
            }
        })

        expect(wrapper.vm.currentQuestion.answer).toHaveLength(2)
        const selected = wrapper.vm.selected
        selected.pop()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentQuestion.answer[0]).toBe('testValue1')
    })

    describe('options - computed', () => {
        test('choice without text property', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: [{ value: 'testValue1', name: 'testName1', checked: true }]
                },
                isAnswerValid() {
                    return '';
                }
            })

            const bFormCheckboxGroup = wrapper.find('v-checkbox-stub')
            expect(bFormCheckboxGroup.vm.label).toBe('testName1')
        })

        test('choices is not array', () => {
            wrapper = initComponent(QuestionCheckbox, {
                currentQuestion: {
                    choices: { value: 'testValue1', name: 'testName1', checked: true }
                },
                isAnswerValid() {
                    return '';
                }
            })

            const bFormCheckboxGroup = wrapper.find('v-checkbox-stub')
            expect(bFormCheckboxGroup.vm).toBeUndefined()
        })
    })
})
