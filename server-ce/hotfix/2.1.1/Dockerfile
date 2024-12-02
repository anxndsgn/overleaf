FROM sharelatex/sharelatex:2.1.0

# Patch: defines recaptcha config to fix share-related issues
# - https://github.com/overleaf/overleaf/issues/684
ADD add-recaptcha-config.patch /etc/overleaf/add-recaptcha-config.patch
RUN cd /etc/overleaf/ && \
    patch < add-recaptcha-config.patch

