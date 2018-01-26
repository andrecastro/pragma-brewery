yarn=0
debug_mode=0
check_rules=0

while test $# -gt 0
do
    case "$1" in
        'yarn' | '-y') 
            yarn=1
            break
            ;;
        '--debug-enabled' | '-d') debug_mode=1
            ;;
        '--check-rules' | '-cr') check_rules=1
            ;;
    esac
    shift
done

if [ ${yarn} -eq 1 ]; then
 shift
 docker run --rm -it -v $PWD:/app -w /app node:9.4.0-alpine apk add && yarn $@
fi


