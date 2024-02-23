<template>
    <div class="cart_page_section py-4 bg-white">
        <div class="container">
            <div class="cart_steps_section pt-2 mb-5">
                <div class="row no-gutters">
                    <div class="col-sm-3 col-3">
                        <div class="cartstep_item text-center"
                            :class="{ 'working_step': step === 1, 'completed_step': step > 1 }">
                            <div class="step_icon">
                                <i class="fas" :class="{ 'fa-circle': step <= 1, 'fa-check': step > 1 }"></i>
                            </div>
                            <h5>Upload Artwork</h5>
                        </div>
                    </div>
                    <div class="col-sm-3 col-3">
                        <div class="cartstep_item text-center"
                            :class="{ 'working_step': step === 2, 'completed_step': step > 2 }">
                            <div class="step_icon"><i class="fas"
                                    :class="{ 'fa-circle': step <= 2, 'fa-check': step > 2 }"></i></div>
                            <h5>Add Address</h5>
                        </div>
                    </div>
                    <div class="col-sm-3 col-3">
                        <div class="cartstep_item text-center"
                            :class="{ 'working_step': step === 3, 'completed_step': step > 3 }">
                            <div class="step_icon">
                                <i class="fas" :class="{ 'fa-circle': step <= 3, 'fa-check': step > 3 }"></i>
                            </div>
                            <h5>Make Payment</h5>
                        </div>
                    </div>
                    <div class="col-sm-3 col-3">
                        <div class="cartstep_item text-center"
                            :class="{ 'working_step': step === 4, 'completed_step': step > 4 }">
                            <div class="step_icon"><i class="fas"
                                    :class="{ 'fa-circle': step <= 4, 'fa-check': step > 4 }"></i></div>
                            <h5>Order Success</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{}
    },
    computed:{
        ...mapState("quotation", ['step'])
    },
}
</script>