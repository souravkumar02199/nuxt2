<template>
    <main>
        <section class="pagetitle position-relative">
            <span @click="goBack()" role="button" class="close-btn text-white position-absolute pointer" style="top: 1rem; right: 1rem;">&#10006;</span>
            <div class="title">
                <h1>Which artwork service is right for you?</h1>
            </div>
        </section>

    <section class="just_print">
        <div class="container">
            <div class="heading">
                <h2>Just Print</h2>
                <p>As the name says, we will simply print your supplied artwork after a cycle of core testing. For this service, you just need to share your ready-to-print PDF.</p>
            </div>

            <div class="just_print_listing">
                <h3>Your file essentials</h3>
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="print_wrap print_wrap1">
                            <span>1</span>
                            <img src="@/assets/images/design-page/pdf-icon.png" alt="">
                            <h4>File must be in PDF format</h4>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-6">
                        <div class="print_wrap print_wrap2">
                            <span>2</span>
                            <img src="@/assets/images/design-page/lock-icon.png" alt="">
                            <h4>Should not be password protected</h4>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="print_wrap print_wrap3">
                            <span>3</span>
                            <img src="@/assets/images/design-page/page-icon.png" alt="">
                            <h4>Page count needs to be in sequence</h4>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="print_wrap print_wrap4">
                            <span>4</span>
                            <img src="@/assets/images/design-page/dimension-icon.png" alt="">
                            <h4>Dimension of artwork must be precise</h4>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="print_wrap print_wrap5">
                            <span>5</span>
                            <img src="@/assets/images/design-page/font-icon.png" alt="">
                            <h4>Make sure that all your fonts are embedded</h4>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="print_wrap print_wrap6">
                            <span>6</span>
                            <img src="@/assets/images/design-page/file-icon.png" alt="">
                            <h4>Your file should not be corrupted</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="file-check">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="colleft">
                        <div class="heading">
                            <h2>File Check</h2>
                            <p>Kindly share your ready-to-print artwork in the following formats: print ready PDF, JPEG, .EPS, or tiff file. While executing our primary inspection, we also conduct an extensive cycle of checks.
                            </p>
                        </div>
                        <img src="@/assets/images/design-page/imagecard.png">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="colright">
                        <ul>
                            <li>
                                <span>1</span>
                                <h3>Acceptable file formats - PDF, JPEG, TIFF, EPS (any of these)</h3>
                            </li>
                            <li>
                                <span>2</span>
                                <h3>Must not be locked with a password </h3>
                            </li>
                            <li>
                                <span>3</span>
                                <h3>Accurate page sequencing</h3>
                            </li>
                            <li>
                                <span>4</span>
                                <h3>The fonts must be embedded</h3>
                            </li>
                            <li>
                                <span>5</span>
                                <h3>Examine the resolution of your pictures</h3>
                            </li>
                            <li>
                                <span>6</span>
                                <h3>Confirm spreads, registration, and orientation</h3>
                            </li>
                            <li>
                                <span>7</span>
                                <h3>Double check panel breadths</h3>
                            </li>
                            <li>
                                <span>8</span>
                                <h3>Verify if the supplied artwork has the accurate bleed for printing</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="file-check proof-check">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="colleft">
                        <div class="heading">
                            <h2>File Check with Proofing</h2>
                            <p>Kindly share your ready-to-print artwork in the following formats: print ready PDF, JPEG, .EPS, or tiff file. While doing our main inspection, we also carry out an extensive cycle of checks. You will also receive a preflight
                                low-resolution testimony from us to confirm that you are satisfied with our work.
                            </p>
                        </div>
                        <img src="@/assets/images/design-page/imagecard.png">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="colright">
                        <ul>
                            <li>
                                <span>1</span>
                                <h3>Acceptable file formats - PDF, JPEG, TIFF, EPS (any of these)</h3>
                            </li>
                            <li>
                                <span>2</span>
                                <h3>File must not be password guarded </h3>
                            </li>
                            <li>
                                <span>3</span>
                                <h3>Accurate page sequencing</h3>
                            </li>
                            <li>
                                <span>4</span>
                                <h3>Artwork size should be precise </h3>
                            </li>
                            <li>
                                <span>5</span>
                                <h3>The fonts need to be embedded</h3>
                            </li>
                            <li>
                                <span>6</span>
                                <h3>Confirm the resolution of your photos</h3>
                            </li>
                            <li>
                                <span>7</span>
                                <h3>Double check panel breadths</h3>
                            </li>
                            <li>
                                <span>8</span>
                                <h3>Verify if the supplied artwork has the accurate bleed for printing</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="designforme">
        <div class="container">
            <div class="heading">
                <h2>Design for me</h2>
                <p>We will examine and fix your files to prevent any further blocks that may arise in the process of top quality printing. </p>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="design_box design_box1">
                        <h3>Your file prerequisites</h3>
                        <ul>
                            <li>Permissible formats of file - PDF, JPEG, TIFF, EPS</li>
                            <li>Should not be secured with a password</li>
                            <li>Page sequencing must be accurate</li>
                            <li>Ensure that all your fonts are embedded</li>
                            <li>Corrupted file will not be accepted</li>
                            <li>Artwork size need to be correct (Check this by consulting the artwork guidebook supplied with every item)</li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="design_box design_box2">
                        <h3>Tests we will run for you</h3>
                        <ul>
                            <li>Study the resolution of your pictures</li>
                            <li>Scan for any vital information in the “safe zone” part which need not be there</li>
                            <li>Confirm spreads, registration, and orientation</li>
                            <li>Verify the breadths of panel </li>
                            <li>Ensure that the artwork provided includes the right bleed for printing</li>
                            <li>Should not be secured with a password</li>
                            <li>Bleed glitches</li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="design_box design_box3">
                        <h3>Issues we will repair for you</h3>
                        <ul>
                            <li>Reconfigure dimensions of artwork (vector artwork preferably)</li>
                            <li>Bleed glitches</li>
                            <li>Safe zone defects</li>
                            <li>Font hitches</li>
                            <li>Insert omitted guides when necessary</li>
                            <li>Segregate or merge artwork</li>
                            <li>Modify kiss cutting and white underpin issues</li>
                            <li>NCR products (guides / numbering)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>
</template>
<script>
    export default{
        middleware: 'scrollToTopMiddleware',
        layout: "user",
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>